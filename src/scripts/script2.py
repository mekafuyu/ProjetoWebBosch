import json;
num = 2

json_object_result = json.dumps(num, indent=4)
with open('./src/scripts/results.json', 'w') as outfile:
        outfile.write(json_object_result)
print(num)