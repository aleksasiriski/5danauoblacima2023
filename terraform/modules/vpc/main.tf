# Meta naming module
module "meta" {
  source = "../meta"
  meta   = var.meta
}

# VPC module
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.1.0"

  name = module.meta.name
  cidr = var.cidr

  azs              = var.azs
  database_subnets = var.database_subnets
  private_subnets  = var.private_subnets
  public_subnets   = var.public_subnets

  enable_nat_gateway = var.enable_nat_gateway
  single_nat_gateway = var.single_nat_gateway
}