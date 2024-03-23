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

                sh 'cd fitness-app && cd backend && npm i '
            }
        }

       stage('Build Docker Image') {
            steps {
                sh "cd fitness-app && cd backend && docker build -t ${DOCKERHUB_REPO}:${DOCKER_IMAGE_TAG} ."
            }
        }

        stage('Test') {
            steps {
                sh 'cd fitness-app && cd backend && npm test'
            }
          
        }
           stage('Push Docker Image to Docker Hub') {
            steps {
                
                sh "cd fitness-app && cd backend && docker login -u ${DOCKERHUB_CREDENTIALS_ID} -p ${DOCKERHUB_PASSWORD}"
                sh "cd fitness-app && cd backend && docker push ${DOCKERHUB_REPO}:${DOCKER_IMAGE_TAG}"
            }
        }
        
    }
}