# Meta naming module
variable "meta" {
  type = object({
    owner    = string
    basename = string
    prefix   = string
  })
}

# VPC module
variable "cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "azs" {
  type    = list(string)
  default = ["eu-central-1a", "eu-central-1b", "eu-central-1c"]
}

variable "database_subnets" {
  type    = list(string)
  default = ["10.0.0.0/24", "10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnets" {
  type    = list(string)
  default = ["10.0.10.0/24", "10.0.11.0/24", "10.0.12.0/24"]
}

variable "public_subnets" {
  type    = list(string)
  default = ["10.0.20.0/24", "10.0.21.0/24", "10.0.22.0/24"]
}

variable "enable_nat_gateway" {
  type    = bool
  default = true
}

variable "single_nat_gateway" {
  type    = bool
  default = false
}