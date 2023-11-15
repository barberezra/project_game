#!/bin/ash

# Start the first process
npm start &

# Start the second process
cd backend
npm start &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?