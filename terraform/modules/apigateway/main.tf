module "meta" {
  source = "../meta"
  meta   = var.meta
}

module "api_gateway" {
  source  = "terraform-aws-modules/apigateway-v2/aws"
  version = "2.2.2"

  name          = module.meta.name
  protocol_type = var.protocol_type

  integrations = var.integrations

  domain_name                 = var.domain_name
  domain_name_certificate_arn = var.domain_name_certificate_arn

  #   default_route_settings = {
  #     detailed_metrics_enabled = true
  #     throttling_burst_limit   = 100
  #     throttling_rate_limit    = 100
  #   }
}


