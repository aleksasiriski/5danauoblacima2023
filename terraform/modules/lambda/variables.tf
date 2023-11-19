# Meta naming module
variable "meta" {
  type = object({
    owner    = string
    basename = string
    prefix   = string
  })
}

# Lambda module
variable "handler" {
  type    = string
  default = "index.lambda_handler"
}

variable "runtime" {
  type    = string
  default = "python3.11"
}

variable "source_path" {
  type = string
}

variable "policies" {
  type    = list(string)
  default = []
}
