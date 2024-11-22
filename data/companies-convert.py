import json
import csv
import sys
import uuid
from datetime import datetime
from typing import Dict, Any, List


def convert_unix_timestamp_ms(timestamp_ms: int | None) -> str:
    if timestamp_ms is None:
        return None
    try:
        return datetime.fromtimestamp(timestamp_ms / 1000).strftime('%Y-%m-%d %H:%M:%S')
    except (TypeError, ValueError):
        return None


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
        'latitude',
        'longitude',
        'name',
        'address',
        'foundation',
        'website',
        'industry',
        'city',
        'employees_min',
        'employees_max',
        'turnover_min',
        'turnover_max',
        'internship',
        'internship_date',
        'internship_type',
        'open_positions',
        'rank',
        'created_at',
        'updated_at',
        'deleted_at'
    ]
    
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    rows = []
    for company in json_data:
        row = {
            'id': str(uuid.uuid4()),
            'external_id': company.get('_id', ''),
            'latitude': company.get('X', ''),
            'longitude': company.get('Y', ''),
            'name': company.get('name', ''),
            'address': company.get('adresa', ''),
            'foundation': company.get('foundation', ''),
            'website': company.get('website', ''),
            'industry': company.get('industry', ''),
            'city': company.get('city', ''),
            'employees_min': company.get('employees_min', ''),
            'employees_max': company.get('employees_max', ''),
            'turnover_min': company.get('turnover_min', ''),
            'turnover_max': company.get('turnover_max', ''),
            'internship': str(company.get('internship', '')).lower(),  # Convert boolean to string
            'internship_date': convert_unix_timestamp_ms(company.get('internship_date')),
            'internship_type': company.get('internship_type', ''),
            'open_positions': company.get('open_positions', ''),
            'rank': company.get('rank', ''),
            'created_at': current_time,
            'updated_at': current_time,
            'deleted_at': None
        }
        rows += [row]
    
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=headers)
        writer.writeheader()
        for row in rows:
            writer.writerow(row)


def main():
    if len(sys.argv) != 3:
        print("Usage: python companies-convert.py <input.json> <output.csv>")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    json_data = read_json_file(input_file)
    convert_job_posting_to_csv(json_data, output_file)


if __name__ == "__main__":
    main()