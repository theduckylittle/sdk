node {
  withCredentials([
    string(credentialsId: 'boundlessgeoadmin-token', variable: 'GITHUB_TOKEN'),
    string(credentialsId: 'sonar-jenkins-pipeline-token', variable: 'SONAR_TOKEN'),
    string(credentialsId: 'NPM_TOKEN', variable: 'NPM_TOKEN'),
  ]) {
    try {
      stage('Checkout'){
        checkout scm
          echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
      }

      stage('Test'){
        // make build
        sh """
          docker run -v \$(pwd -P):/web \
                     -w /web quay.io/boundlessgeo/node-yarn-sonar bash \
                     -c 'npm install && npm run test'
          """
      }

      stage('Coverage'){
        // make lint
        sh """
          docker run -v \$(pwd -P):/web \
                     -w /web quay.io/boundlessgeo/node-yarn-sonar bash \
                     -c 'npm run cover'
          """
      }

      if (env.BRANCH_NAME == 'master') {
        stage('SonarQube Analysis') {
            sh """
              docker run -v \$(pwd -P):/web \
                         -w /web quay.io/boundlessgeo/node-yarn-sonar \
                         bash -c 'sonar-scanner \
                                           -Dsonar.host.url=https://sonar-ciapi.boundlessgeo.io \
                                           -Dsonar.login=$SONAR_TOKEN \
                                           -Dsonar.projectKey=web-sdk \
                                           -Dsonar.sources=src \
                                           -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info'
              """
        }
      }

      if (gitTagCheck()) {
        stage('Create release') {
            sh """
              docker run -v \$(pwd -P):/web \
                         -w /web quay.io/boundlessgeo/node-yarn-sonar bash \
                         -c 'echo "//registry.npmjs.org/:_authToken=${env.NPM_TOKEN}" > ~/.npmrc && npm install && npm run dist && cd dist && npm publish'
              """
        }
      }

      currentBuild.result = "SUCCESS"
    }
    catch (err) {

      currentBuild.result = "FAILURE"
        throw err
    } finally {
      // Success or failure, always send notifications
      echo currentBuild.result
    }

  }
}
