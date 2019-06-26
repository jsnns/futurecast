

npm test -- --coverage
CODECLIMATE_API_HOST=https://codebeat.co/webhooks/code_coverage \
CODECLIMATE_REPO_TOKEN=fa19b76f-39a9-4fab-9905-1bb046627cf5 \
codeclimate-test-reporter < coverage/lcov.info