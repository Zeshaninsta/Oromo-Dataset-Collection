import csv

# Define the data
data = []
while True:
    incorrect = input("please provide incorrect sentences: ")
    correct = input("please provide correct sentences: ")
    data.append({"original text": incorrect, "Corrected text": correct,})  # Append a dictionary instead of individual values
    # Define the file path
    file_path = "my_dataset.csv"

    # Define the field names
    field_names = ["original text", "Corrected text"]

    # Write the dataset to CSV
    with open(file_path, mode='w', newline='') as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=field_names)

        writer.writeheader()  # Write the header row with field names
        writer.writerows(data)  # Write the data rows

    print("Dataset written to", file_path)
