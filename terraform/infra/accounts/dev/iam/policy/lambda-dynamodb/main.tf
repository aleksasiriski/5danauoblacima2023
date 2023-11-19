terraform {
  backend "s3" {
    bucket         = "dev-5dana-state"
    key            = "dev/iam/role/lambda-dynamodb/terraform.tfstate"
    region         = "eu-central-1"
    encrypt        = "true"
    dynamodb_table = "dev-5dana-state"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "eu-central-1"
  default_tags {
    tags = local.tags
  }
}

data "aws_caller_identity" "current" {}

locals {
  required_tags = {
    project     = var.project_name,
    environment = var.environment
  }

  tags = merge(var.resource_tags, local.required_tags)

  meta = {
    owner    = var.project_name
    basename = var.service
    prefix   = var.environment
  }

  account_id = data.aws_caller_identity.current.account_id
}

module "role" {
  source = "git::ssh://git@github.com/aleksasiriski/5dana_tf_modules//iam/role"
  meta   = local.meta

  name = "LambdaAccessDynamoDB"
  path = "/"

  statements = [{
    sid = "DynamoDBAccess"
    actions = [
      "dynamodb:BatchGetItem",
      "dynamodb:GetItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:BatchWriteItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem"
    ]
    resources = ["arn:aws:dynamodb:eu-central-1:${local.account_id}:table/dev-5dana-players-db", "arn:aws:dynamodb:eu-central-1:${local.account_id}:table/dev-5dana-players-db-sqs"]
  }]
}
