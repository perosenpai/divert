curl --location --request POST 'https://data.mongodb-api.com/app/data-diork/endpoint/data/v1/action/findOne' \
--header 'Content-Type: application/json' \
--header 'Access-Control-Request-Headers: *' \
--header 'api-key: qtS6vcFei9nTmhxE7RszamOZK9jPspkkeTsXk8WSzZy56MFtRW8rvTirrTnHSjsP' \
--data-raw '{
    "collection":"users",
    "database":"test",
    "dataSource":"Divert",
    "projection": {"_id": 1, 'name: 'COJE''}
}'