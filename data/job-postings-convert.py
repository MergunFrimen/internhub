import json
import csv
import sys
import uuid
from datetime import datetime
from typing import Dict, Any, List


def read_json_file(input_file: str) -> Dict[Any, Any]:
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: Input file '{input_file}' not found.")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in file '{input_file}': {str(e)}")
        sys.exit(1)
    except Exception as e:
        print(f"Error reading file '{input_file}': {str(e)}")
        sys.exit(1)


def convert_job_posting_to_csv(json_data: List[Dict[Any, Any]], output_file: str) -> None:
    headers = [
        'id',
        'external_id',
        'field',
        'title',
        'description',
        'tags',
        'requirements',
        'created_at',
        'updated_at',
        'deleted_at',
        'home_office',
        'hours',
    ]
    
    rows = []
    for posting in json_data:
        date_added = posting.get('dateAdded', None)
        if date_added is not None and isinstance(date_added, int):
            date_added = datetime.utcfromtimestamp(date_added / 1000)
        print(date_added)
        row = {
            'id': str(uuid.uuid4()),
            'external_id': posting.get('_id', ''),
            'field': posting.get('field', ''),
            'title': posting.get('title', ''),
            'description': posting.get('description', ''),
            'tags': json.dumps(posting.get('tags', []), ensure_ascii=False),
            'requirements': json.dumps(posting.get('requirements', []), ensure_ascii=False),
            'created_at': date_added,
            'updated_at': date_added,
            'deleted_at': None,
            'home_office': posting.get('homeOffice', None),
            'hours': posting.get('hours', None),
        }
        rows += [row]
    
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=headers)
        writer.writeheader()
        for row in rows:
            writer.writerow(row)


def main():
    if len(sys.argv) != 3:
        print("Usage: python jobs-postings-convert.py <input.json> <output.csv>")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    json_data = read_json_file(input_file)
    convert_job_posting_to_csv(json_data, output_file)


if __name__ == "__main__":
    main()