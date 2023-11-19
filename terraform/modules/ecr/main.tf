# ECR module
module "ecr" {
  for_each = var.repositories != null ? var.repositories : {}

  source  = "terraform-aws-modules/ecr/aws"
  version = "1.6.0"

  repository_name                 = each.key
  repository_type                 = each.value.repository_type
  repository_image_tag_mutability = each.value.repository_image_tag_mutability ? "MUTABLE" : "IMMUTABLE"

  repository_read_write_access_arns = each.value.repository_read_write_access_arns
  repository_lifecycle_policy = jsonencode({
    rules = each.value.rules
  })
}