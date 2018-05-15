/*
Boundless Web SDK examples pipeline.
POC- Nick Stires

Build requirements:
* nvm
* npm
** 2.15.9 (default)
** 6.11.3 (available)

Source repos:
* https://github.com/boundlessgeo/sdk

Artifacts out:
WORKSPACE/archive/
*/

pipeline {

  agent {
    label 'jenkins-slave-01.boundlessgeo.com'
  }

  stages {
  	stage('Build') {
      steps {
        makeDir("$WORKSPACE/archive/")

        script {
          sh """
            #!/bin/bash

            source /var/jenkins/.nvm/nvm.sh
            nvm use 6.11.3
            npm install
            npm run bundle-examples
            npm run jsdoc
          """
        }
      }
    }

    stage('Package') {
      steps {
        script {
          sh """
            mkdir build/hosted/examples/docs/
            mv docs/out/* build/hosted/examples/docs/
            cd build/hosted/
            tar -czpf $WORKSPACE/archive/sdk-examples.tgz *
          """
        }
        archiveArtifacts artifacts: "archive/sdk-examples.tgz", fingerprint: true
      }
    }

    stage('Release') {
      steps {
        script {
          sh """
            ssh root@sdk.boundlessgeo.com '
              rm -rf /var/www/*
            '

            scp $WORKSPACE/archive/sdk-examples.tgz root@sdk.boundlessgeo.com:/tmp

            ssh root@sdk.boundlessgeo.com '
              tar -xzpf /tmp/sdk-examples.tgz -C /var/www/
            '
          """
        }
      }
    }

  }
}

def makeDir(def dir) {
  dirCheck = sh (script: "test -d ${dir} && echo '1' || echo '0' ", returnStdout: true).trim()
  if (dirCheck=='1') {
    echo "Cleaning contents of following directory: $dir"
    sh "rm -rf $dir"
  }
  sh "mkdir -p $dir"
}
