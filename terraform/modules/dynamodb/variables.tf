# Meta naming module
variable "meta" {
  type = object({
    owner    = string
    basename = string
    prefix   = string
  })
}

# DynamoDB module
variable "hash_key" {
  type    = string
  default = "LockID"
}

variable "attributes" {
  type = list(object({
    name = string
    type = string
  }))

  default = [{
    name = "LockID"
    type = "S"
  }]
}