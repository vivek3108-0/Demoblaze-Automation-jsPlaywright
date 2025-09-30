pipeline {
    agent any
    
    options {
        // Keep only last 10 builds
        buildDiscarder(logRotator(numToKeepStr: '10'))
        // Timeout after 30 minutes
        timeout(time: 30, unit: 'MINUTES')
        // Timestamps in console output
        timestamps()
    }
    
    environment {
        // Node version
        NODEJS_HOME = tool 'NodeJS-18'
        PATH = "${NODEJS_HOME}/bin:${PATH}"
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
                sh 'rm -rf node_modules test-results playwright-report'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm ci'
                
                echo 'Installing Playwright browsers...'
                sh 'npx playwright install --with-deps'
                
                // Verify installation
                sh 'npx playwright --version'
                sh 'node --version'
                sh 'npm --version'
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
                    
                    // Run tests
                    sh testCommand
                }
            }
            post {
                always {
                    // Archive test results
                    archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                    
                    // Publish test results
                    publishTestResults(
                        testResultsPattern: 'junit-results.xml',
                        allowEmptyResults: true
                    )
                }
            }
        }
        
        stage('Generate Reports') {
            when {
                expression { params.GENERATE_REPORT }
            }
            steps {
                echo 'Generating HTML test report...'
                sh 'npx playwright show-report --reporter=html'
                
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
                        sh '''
                            echo "Test Execution Summary:"
                            cat test-results.json | jq '.suites[].specs[] | {title: .title, duration: (.tests[0].results[0].duration // 0)}' || echo "No JSON report found"
                        '''
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution completed!'
            
            // Clean up large files but keep reports
            sh '''
                rm -rf node_modules/.cache
                find test-results -name "*.webm" -delete || true
                find test-results -name "*.zip" -delete || true
            '''
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
            echo '❌ Tests failed or pipeline error occurred!'
            
            // Archive failure artifacts
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
            
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
