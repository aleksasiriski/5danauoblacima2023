# Meta naming module
module "meta" {
  source = "../../meta"
  meta   = var.meta
}

# IAM Role module
data "aws_iam_policy_document" "instance_assume_role_policy" {
  dynamic "statement" {
    for_each = var.assume_statements != null ? var.assume_statements : []
    content {
      sid     = statement.value.sid
      effect  = statement.value.effect
      actions = statement.value.actions

      dynamic "principals" {
        for_each = statement.value.principals != null ? statement.value.principals : []
        content {
          type        = principals.value.type
          identifiers = principals.value.identifiers
        }
      }

      dynamic "condition" {
        for_each = statement.value.conditions != null ? statement.value.conditions : []
        content {
          test     = condition.value.test
          variable = condition.value.variable
          values   = condition.value.values
        }
      }
    }
  }
}

data "aws_iam_policy_document" "inline_policy" {
  dynamic "statement" {
    for_each = var.statements != null ? var.statements : []
    content {
      sid       = statement.value.sid
      effect    = statement.value.effect
      actions   = statement.value.actions
      resources = statement.value.resources
    }
  }
}

resource "aws_iam_role" "iam_role" {
  name               = var.name
  path               = var.path
  assume_role_policy = data.aws_iam_policy_document.instance_assume_role_policy.json
  inline_policy {
    name   = module.meta.name
    policy = data.aws_iam_policy_document.inline_policy.json
  }
}