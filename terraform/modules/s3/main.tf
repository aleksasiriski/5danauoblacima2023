# Meta naming module
module "meta" {
  source = "../meta"
  meta   = var.meta
}

# S3 module
data "aws_caller_identity" "current" {}

locals {
  attach_policy = var.cloudfront_id != null ? true : false
  cloudfront_policy = var.cloudfront_id != null ? templatefile("${path.module}/policy.json.tpl", {
    bucket_name   = module.meta.name
    aws_id        = data.aws_caller_identity.current.account_id
    cloudfront_id = var.cloudfront_id
  }) : null
}

module "s3_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "3.14.1"

  bucket = module.meta.name
  acl    = var.acl

  control_object_ownership = var.control_object_ownership
  object_ownership         = var.object_ownership

  versioning = {
    enabled = var.versioning
  }

  attach_policy = local.attach_policy
  policy        = local.cloudfront_policy
}