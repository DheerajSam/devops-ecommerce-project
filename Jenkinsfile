pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        IMAGE_NAME = 'dheeraj202/devops-ecommerce'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .'
                sh 'docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest'
            }
        }
        
        stage('Push to DockerHub') {
            steps {
                echo 'Pushing to DockerHub...'
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push ${IMAGE_NAME}:${BUILD_NUMBER}'
                sh 'docker push ${IMAGE_NAME}:latest'
            }
        }
        
        stage('Deploy to EC2') {
            steps {
                echo 'Deploying application...'
                sh 'docker stop ecommerce-app || true'
                sh 'docker rm ecommerce-app || true'
                sh 'docker run -d --name ecommerce-app -p 3000:3000 ${IMAGE_NAME}:latest'
                echo 'Application deployed successfully!'
            }
        }
        
        stage('Health Check') {
            steps {
                echo 'Running health check...'
                sh 'sleep 10'
                sh 'curl -f http://172.17.0.1:3000/health || exit 1'
                echo 'Application is running successfully!'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
