import re

# Read input from clean.txt
with open("clean.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Regex pattern to match lines that represent Google Business entries
# We're not parsing, just removing everything NOT matching the core pattern
# We'll use a broad but safe heuristic for lines likely to be business listings

# A business line typically contains a name (possibly with ratings), address, phone, and optional website/directions
# We'll use a very simple heuristic: lines with a phone number and/or website are likely businesses
# To be safe, we'll remove anything that doesn't contain at least one phone number or website URL

import re as re_module

# Simple regex for US phone numbers and basic URL patterns
phone_regex = re_module.compile(r'\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}')
url_regex = re_module.compile(r'https?://\S+|www\.\S+')

def is_business_line(line):
    # If the line contains a phone number or a URL, assume it's a business line
    return bool(phone_regex.search(line) or url_regex.search(line))

# Split into lines
lines = text.split('\n')

# Keep only lines that are likely business listings
business_lines = [line for line in lines if is_business_line(line)]

# Join and output the filtered lines (preserves the original order and formatting)
print('\n'.join(business_lines))