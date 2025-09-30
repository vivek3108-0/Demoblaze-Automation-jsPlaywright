pipeline {
    agent any
    
    options {
        // Keep only last 10 builds
        buildDiscarder(logRotator(numToKeepStr: '10'))
        // Timeout after 60 minutes
        timeout(time: 60, unit: 'MINUTES')
        // Timestamps in console output
        timestamps()
    }
    
    environment {
        // Playwright environment variables
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '0'
        PLAYWRIGHT_BROWSERS_PATH = '/opt/playwright'
        // CI flag for Playwright
        CI = 'true'
    }
    
    parameters {
        choice(
            name: 'TEST_SUITE',
            choices: ['all', 'ui', 'api', 'hybrid'],
            description: 'Select test suite to run'
        )
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Select browser for testing'
        )
        booleanParam(
            name: 'HEADED_MODE',
            defaultValue: false,
            description: 'Run tests in headed mode (for debugging)'
        )
        booleanParam(
            name: 'GENERATE_REPORT',
            defaultValue: true,
            description: 'Generate HTML test report'
        )
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
                // Clean workspace  
                bat 'if exist node_modules rmdir /s /q node_modules'
                bat 'if exist test-results rmdir /s /q test-results'
                bat 'if exist playwright-report rmdir /s /q playwright-report'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    // Use Node.js if available, otherwise use system Node
                    try {
                        def nodeHome = tool name: 'NodeJS-18', type: 'nodejs'
                        env.PATH = "${nodeHome}/bin:${env.PATH}"
                    } catch (Exception e) {
                        echo 'NodeJS tool not configured, using system Node.js'
                    }
                }
                
                echo 'Installing Node.js dependencies...'
                bat 'npm ci'
                
                echo 'Installing Playwright browsers...'
                bat 'npx playwright install --with-deps'
                
                // Verify installation
                bat 'npx playwright --version'
                bat 'node --version'
                bat 'npm --version'
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    echo "Running ${params.TEST_SUITE} tests on ${params.BROWSER}..."
                    
                    def testCommand = "npx playwright test"
                    
                    // Add test suite filter
                    if (params.TEST_SUITE != 'all') {
                        testCommand += " tests/${params.TEST_SUITE}"
                    }
                    
                    // Add browser project
                    testCommand += " --project=${params.BROWSER}"
                    
                    // Add headed mode if selected
                    if (params.HEADED_MODE) {
                        testCommand += " --headed"
                    }
                    
                    // Run tests with extended timeout
                    timeout(time: 30, unit: 'MINUTES') {
                        bat testCommand
                    }
                }
            }
            post {
                always {
                    // Archive test results
                    archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                    
                    // Publish test results (using standard junit step)
                    junit testResults: 'junit-results.xml', allowEmptyResults: true
                }
            }
        }
        
        stage('Generate Reports') {
            when {
                expression { params.GENERATE_REPORT }
            }
            steps {
                echo 'Generating HTML test report...'
                bat 'npx playwright show-report --reporter=html'
                
                // Archive HTML report
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report',
                    reportTitles: 'DemoBlaze Automation Report'
                ])
            }
        }
        
        stage('Performance Analysis') {
            steps {
                script {
                    // Simple performance check
                    if (fileExists('test-results.json')) {
                        bat '''
                            echo Test Execution Summary:
                            if exist test-results.json type test-results.json
                        '''
                    }
                }
            }
        }
    }
    
    post {
        always {
            script {
                echo 'Pipeline execution completed!'
                
                // Clean up large files but keep reports (Windows compatible)
                try {
                    bat '''
                        if exist node_modules\\.cache rmdir /s /q node_modules\\.cache
                        for /r test-results %%i in (*.webm) do del "%%i" 2>nul
                        for /r test-results %%i in (*.zip) do del "%%i" 2>nul
                    '''
                } catch (Exception e) {
                    echo "Cleanup failed: ${e.getMessage()}"
                }
            }
        }
        
        success {
            echo '✅ All tests passed successfully!'
            
            // Send success notification (optional)
            script {
                if (env.SLACK_WEBHOOK) {
                    slackSend(
                        channel: '#automation',
                        color: 'good',
                        message: "✅ DemoBlaze Tests PASSED - Build #${BUILD_NUMBER}"
                    )
                }
            }
        }
        
        failure {
            script {
                echo '❌ Tests failed or pipeline error occurred!'
                
                // Archive failure artifacts
                try {
                    archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                } catch (Exception e) {
                    echo "Could not archive artifacts: ${e.getMessage()}"
                }
            }
            
            // Send failure notification (optional)
            script {
                if (env.SLACK_WEBHOOK) {
                    slackSend(
                        channel: '#automation',
                        color: 'danger',
                        message: "❌ DemoBlaze Tests FAILED - Build #${BUILD_NUMBER}\nCheck: ${BUILD_URL}"
                    )
                }
            }
        }
        
        unstable {
            echo '⚠️ Tests completed with some failures!'
        }
    }
}
