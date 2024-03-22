pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/Darustet/otp-projekti.git'
                DOCKERHUB_CREDENTIALS_ID = 'adeahmed'
        DOCKERHUB_REPO = 'adeahmed/fitnessapp'
        DOCKER_IMAGE_TAG = 'latest'
        DOCKERHUB_PASSWORD = '21Xbe5fey10'
        PATH = "/usr/local/bin:$PATH"
    }


    tools {
        maven 'maven'
        jdk 'jdk'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: "https://github.com/Darustet/otp-projekti.git"
            }
        }
          stage('install') {
            steps {
                sh 'npm i '
            }
        }

        stage('Build') {
            steps {
                sh 'npm start'
            }
        }

            stage('BuildDocker') {
            steps {
                sh 'docker build -t fitnessapp.'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
            post {
                success {
                    junit '**/target/surefire-reports/TEST-*.xml'

                    jacoco(execPattern: '**/target/jacoco.exec')
                }
            }
        }
    }
}