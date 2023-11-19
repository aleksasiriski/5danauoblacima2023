# Meta naming module
module "meta" {
  source = "../meta"
  meta   = var.meta
}

# DynamoDB module
module "dynamodb_table" {
  source  = "terraform-aws-modules/dynamodb-table/aws"
  version = "3.3.0"

  name     = module.meta.name
  hash_key = var.hash_key

  attributes = var.attributes
}