# Jenkins Job Configuration Guide

## Step 1: Create New Pipeline Job

1. **Jenkins Dashboard → New Item**
2. **Enter Job Name:** `DemoBlaze-Playwright-Automation`
3. **Select:** Pipeline
4. **Click:** OK

## Step 2: Configure Pipeline Job

### General Settings
- ✅ **Description:** DemoBlaze E2E Automation with Playwright
- ✅ **GitHub Project:** https://github.com/vivek3108-0/Demoblaze-Automation-jsPlaywright
- ✅ **Build Triggers:**
  - Poll SCM: `H/15 * * * *` (every 15 minutes)
  - GitHub hook trigger for GITScm polling
- ✅ **Build Parameters:** (Already configured in Jenkinsfile)

### Pipeline Configuration
- **Definition:** Pipeline script from SCM
- **SCM:** Git
- **Repository URL:** `https://github.com/vivek3108-0/Demoblaze-Automation-jsPlaywright.git`
- **Branch:** `*/main` (or `*/master` if your repo uses master branch)
- **Script Path:** `Jenkinsfile`

### Advanced Options
- **Lightweight checkout:** ✅ Enabled
- **Clean before checkout:** ✅ Enabled

## Step 3: Configure Build Environment

### Environment Variables (if needed)
```bash
# In Jenkins Job → Configure → Build Environment
PLAYWRIGHT_BROWSERS_PATH=/opt/playwright
NODE_ENV=test
BASE_URL=https://www.demoblaze.com
```

### Build Steps Order
1. Checkout SCM
2. Install Dependencies
3. Run Tests
4. Generate Reports
5. Archive Artifacts
6. Publish Results

## Step 4: Post-Build Actions

### Test Results
- **Publish JUnit test result report**
- **Test report XMLs:** `junit-results.xml`

### HTML Reports
- **HTML Publisher**
- **HTML directory to archive:** `playwright-report`
- **Index page:** `index.html`
- **Report title:** `Playwright Test Report`

### Artifacts
- **Archive artifacts:** `test-results/**/*,playwright-report/**/*`
- **Keep builds:** Last 10 builds

## Step 5: Notifications (Optional)

### Email Notifications
- **Recipients:** your-email@domain.com
- **Send email for:** Failed builds, Unstable builds

### Slack Notifications
- **Channel:** #automation
- **On Success:** ✅ Tests Passed
- **On Failure:** ❌ Tests Failed - Check logs

## Build Parameters Usage

When running the job, you can select:

### TEST_SUITE Options:
- `all` - Run all tests
- `ui` - Run only UI tests
- `api` - Run only API tests  
- `hybrid` - Run only hybrid tests

### BROWSER Options:
- `chromium` - Chrome browser
- `firefox` - Firefox browser
- `webkit` - Safari browser

### Additional Options:
- `HEADED_MODE` - Run tests visually (for debugging)
- `GENERATE_REPORT` - Create HTML report (recommended: ON)

## Webhook Configuration (For Auto-Trigger)

### GitHub Webhook Setup:
1. **Go to:** GitHub Repository → Settings → Webhooks
2. **Payload URL:** `http://your-jenkins-url/github-webhook/`
3. **Content type:** application/json
4. **Events:** Push events, Pull requests
5. **Active:** ✅ Enabled

### Jenkins GitHub Integration:
1. **Manage Jenkins → Configure System**
2. **GitHub Servers → Add GitHub Server**
3. **API URL:** https://api.github.com
4. **Credentials:** Add GitHub token
5. **Test Connection:** Verify

## Performance Optimization

### Jenkins Node Configuration:
```bash
# For better performance
JAVA_OPTS="-Xmx2048m -XX:MaxPermSize=512m"
```

### Playwright Optimization:
```bash
# In pipeline environment
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=0
PLAYWRIGHT_BROWSERS_PATH=/opt/playwright
```

## Troubleshooting Common Issues

### Browser Installation Issues:
```bash
# Run in Jenkins shell
npx playwright install --with-deps chromium
```

### Permission Issues:
```bash
# Fix file permissions
chmod +x /opt/playwright/chromium-*/chrome-linux/chrome
```

### Memory Issues:
```bash
# Increase heap size
export NODE_OPTIONS="--max-old-space-size=4096"
```
