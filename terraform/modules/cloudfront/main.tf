# Meta naming module
module "meta" {
  source = "../meta"
  meta   = var.meta
}

data "aws_s3_bucket" "s3_bucket" {
  count  = var.origin_type == "S3" ? 1 : 0
  bucket = var.s3.bucket_name
}

# Cloudfront module
provider "aws" {
  alias  = "global"
  region = "us-east-1" // required by Cloudfront
}

data "aws_acm_certificate" "selected" {
  count       = var.domain_alias != null ? 1 : 0
  provider    = aws.global
  domain      = var.domain_alias
  most_recent = true
}

locals {
  origin = var.origin_type == "S3" ? {
    domain_name       = data.aws_s3_bucket.s3_bucket[0].bucket_regional_domain_name
    access_control_id = aws_cloudfront_origin_access_control.cloudfront_origin_access_control[0].id
    id                = "s3"
    } : var.origin_type == "LB" ? {
    domain_name = var.lb.domain_name
    id          = "lb"
  } : null

  default_cache_behavior = var.origin_type == "S3" ? {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.origin.id

    forwarded_values = {
      query_string = false

      cookies = {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    } : var.origin_type == "LB" ? {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.origin.id

    forwarded_values = {
      query_string = false

      cookies = {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  } : null

  ordered_cache_behavior = var.origin_type == "S3" ? [{
    path_pattern     = "/*"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.origin.id

    forwarded_values = {
      query_string = false
      headers      = ["Origin"]

      cookies = {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
    }] : var.origin_type == "LB" ? [{
    path_pattern     = "/static/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = local.origin.id

    forwarded_values = {
      query_string = false
      headers      = ["Origin"]

      cookies = {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }] : null

  custom_error_responses = var.origin_type == "S3" ? setunion(var.custom_error_responses, [
    {
      error_code            = 403
      response_code         = 200
      error_caching_min_ttl = 10
      response_page_path    = "/index.html"
    },
    {
      error_code            = 404
      response_code         = 200
      error_caching_min_ttl = 10
      response_page_path    = "/index.html"
    }
  ]) : var.custom_error_responses
}

resource "aws_cloudfront_origin_access_control" "cloudfront_origin_access_control" {
  count                             = var.origin_type == "S3" ? 1 : 0
  name                              = "cloudfront_origin_access_control"
  description                       = "S3 policy"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "cloudfront_distribution" {
  aliases     = var.domain_alias != null && var.domain_alias != "" ? [var.domain_alias] : []
  price_class = var.price_class

  enabled             = true
  is_ipv6_enabled     = true
  http_version        = "http2and3"
  comment             = join("-", [module.meta.name, var.origin_type])
  default_root_object = "index.html"

  dynamic "logging_config" {
    for_each = var.logging_config != null ? [var.logging_config] : []
    content {
      include_cookies = logging_config.value.include_cookies
      bucket          = logging_config.value.bucket
      prefix          = logging_config.value.prefix
    }
  }

  # Origins
  origin {
    domain_name              = local.origin.domain_name
    origin_access_control_id = local.origin.access_control_id
    origin_id                = local.origin.id
  }

  dynamic "default_cache_behavior" {
    for_each = local.default_cache_behavior != null ? [local.default_cache_behavior] : []
    content {
      allowed_methods  = default_cache_behavior.value.allowed_methods
      cached_methods   = default_cache_behavior.value.cached_methods
      target_origin_id = default_cache_behavior.value.target_origin_id

      dynamic "forwarded_values" {
        for_each = default_cache_behavior.value.forwarded_values != null ? [default_cache_behavior.value.forwarded_values] : []
        content {
          query_string = forwarded_values.value.query_string
          dynamic "cookies" {
            for_each = forwarded_values.value.cookies != null ? [forwarded_values.value.cookies] : []
            content {
              forward = cookies.value.forward
            }
          }
        }
      }

      viewer_protocol_policy = default_cache_behavior.value.viewer_protocol_policy
      min_ttl                = default_cache_behavior.value.min_ttl
      default_ttl            = default_cache_behavior.value.default_ttl
      max_ttl                = default_cache_behavior.value.max_ttl
    }
  }

  dynamic "ordered_cache_behavior" {
    for_each = local.ordered_cache_behavior != null ? local.ordered_cache_behavior : []
    content {
      path_pattern     = ordered_cache_behavior.value.path_pattern
      allowed_methods  = ordered_cache_behavior.value.allowed_methods
      cached_methods   = ordered_cache_behavior.value.cached_methods
      target_origin_id = ordered_cache_behavior.value.target_origin_id

      dynamic "forwarded_values" {
        for_each = ordered_cache_behavior.value.forwarded_values != null ? [ordered_cache_behavior.value.forwarded_values] : []
        content {
          query_string = forwarded_values.value.query_string
          headers      = forwarded_values.value.headers
          dynamic "cookies" {
            for_each = forwarded_values.value.cookies != null ? [forwarded_values.value.cookies] : []
            content {
              forward = cookies.value.forward
            }
          }
        }
      }

      compress               = ordered_cache_behavior.value.compress
      viewer_protocol_policy = ordered_cache_behavior.value.viewer_protocol_policy
      min_ttl                = ordered_cache_behavior.value.min_ttl
      default_ttl            = ordered_cache_behavior.value.default_ttl
      max_ttl                = ordered_cache_behavior.value.max_ttl
    }
  }

  dynamic "restrictions" {
    for_each = var.restrictions != null ? var.restrictions : []
    content {
      dynamic "geo_restriction" {
        for_each = restrictions.value.geo_restriction != null ? [restrictions.value.geo_restriction] : []
        content {
          restriction_type = geo_restriction.value.restriction_type
          locations        = geo_restriction.value.locations
        }
      }
    }
  }

  dynamic "custom_error_response" {
    for_each = local.custom_error_responses != null ? local.custom_error_responses : []
    content {
      error_code            = custom_error_response.value.error_code
      response_code         = custom_error_response.value.response_code
      error_caching_min_ttl = custom_error_response.value.error_caching_min_ttl
      response_page_path    = custom_error_response.value.response_page_path
    }
  }

  dynamic "viewer_certificate" {
    for_each = var.viewer_certificate != null ? [var.viewer_certificate] : []
    content {
      acm_certificate_arn            = viewer_certificate.value.acm_certificate_arn != null ? viewer_certificate.value.acm_certificate_arn : var.domain_alias != null ? data.aws_acm_certificate.selected[0].arn : null
      cloudfront_default_certificate = var.domain_alias != null ? false : viewer_certificate.value.cloudfront_default_certificate
      iam_certificate_id             = viewer_certificate.value.iam_certificate_id
      minimum_protocol_version       = viewer_certificate.value.minimum_protocol_version
      ssl_support_method             = viewer_certificate.value.ssl_support_method
    }
  }
}