terraform {
  backend "s3" {
    bucket         = "dev-5dana-state"
    key            = "dev/dynamodb/players-db/terraform.tfstate"
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
}

module "dynamodb" {
  source   = "git::ssh://git@github.com/aleksasiriski/5dana_tf_modules//dynamodb"
  meta     = local.meta
  hash_key = "PLAYER"
  attributes = [{
    name = "PLAYER"
    type = "S"
    },
  ]
}

