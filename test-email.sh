#!/bin/bash

# Test Email Service Script
echo "🧪 Testing Little Playroom Cafe Email Service"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
else
    echo "✅ Dependencies are already installed"
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating template..."
    echo "GMAIL_APP_PASSWORD=your_16_character_app_password_here" > .env
    echo "📝 Please edit .env file with your Gmail App Password"
    echo "📖 See GMAIL_SETUP_GUIDE.md for instructions"
    exit 1
fi

# Check if GMAIL_APP_PASSWORD is set
if ! grep -q "GMAIL_APP_PASSWORD=" .env || grep -q "your_16_character_app_password_here" .env; then
    echo "❌ GMAIL_APP_PASSWORD not properly set in .env file"
    echo "📖 Please follow GMAIL_SETUP_GUIDE.md to set up your App Password"
    exit 1
fi

echo "✅ Environment variables are configured"

# Start the server
echo "🚀 Starting email server..."
echo "📧 Server will be available at: http://localhost:3000"
echo "🔄 Press Ctrl+C to stop the server"
echo ""

# Start the server
npm start
