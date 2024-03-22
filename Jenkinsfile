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

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from Git repository
                 git branch: 'main', url: 'https://github.com/adeahmed/FarToCel_Adeahmed.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKERHUB_REPO}:${DOCKER_IMAGE_TAG} ."
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                
                sh "docker login -u ${DOCKERHUB_CREDENTIALS_ID} -p ${DOCKERHUB_PASSWORD}"
                sh "docker push ${DOCKERHUB_REPO}:${DOCKER_IMAGE_TAG}"
            }
        }
    }
}
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