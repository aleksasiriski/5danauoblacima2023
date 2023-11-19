# Meta naming module
module "meta" {
  source = "../meta"
  meta   = var.meta
}

# Lambda module
module "lambda" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "6.4.0"

  function_name = module.meta.name
  handler       = var.handler
  runtime       = var.runtime
  source_path   = var.source_path

  attach_policies = var.policies == [] ? false : true
  policies        = var.policies
}
