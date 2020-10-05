import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource ('dynamodb')
    table =dynamodb.Table('sitevisits')
    response = table.get_item(Key={'visits':'0'})
    print (response['Item'])
    table.update_item(
        Key ={
            'visits':'0'
        },
        UpdateExpression = 'SET Counts = :value1',
        ExpressionAttributeValues={
            ':value1':20
        }
        )
    print ("After update \n")
    response = table.get_item(Key={'visits':'0'})
    print (response['Item'])