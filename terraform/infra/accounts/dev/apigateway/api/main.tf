terraform {
  backend "s3" {
    bucket         = "dev-5dana-state"
    key            = "dev/apigateway/api/terraform.tfstate"
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

module "apigateway" {
  source = "git::ssh://git@github.com/aleksasiriski/5dana_tf_modules//apigateway"
  meta   = local.meta
  integrations = {
    "GET /stats/player/{playerFullName}" : {
      lambda_arn = data.aws_lambda_function.api_lambda.arn
    },
  }

  domain_name                 = "levi.aleksasiriski.dev"
  domain_name_certificate_arn = "arn:aws:acm:eu-central-1:157697923375:certificate/fd349edf-8cab-4708-bee0-2f7cf6a56b4b"
}

data "aws_lambda_function" "api_lambda" {
  function_name = "${local.meta.prefix}-${local.meta.owner}-lambda-api"
}
