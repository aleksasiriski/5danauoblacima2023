# ECR module
variable "repositories" {
  type = map(object({
    repository_type                   = optional(string, "private")
    repository_image_tag_mutability   = optional(bool, false)
    repository_read_write_access_arns = optional(list(string), [])
    rules = optional(list(object({
      rulePriority = number,
      description  = string
      selection = object({
        tagStatus     = string
        tagPrefixList = list(string)
        countType     = string
        countNumber   = number
      }),
      action = map(any)
      })), [{
      rulePriority = 1,
      description  = "Keep last 30 images",
      selection = {
        tagStatus     = "tagged",
        tagPrefixList = ["v"],
        countType     = "imageCountMoreThan",
        countNumber   = 30
      },
      action = {
        type = "expire"
      }
      }
    ])
  }))
}