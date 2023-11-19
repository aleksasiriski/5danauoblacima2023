output "name" {
  value = join("-", compact([var.meta.prefix, var.meta.owner, var.meta.basename]))
}

output "labels" {
  value = {
    owner    = var.meta.owner
    basename = var.meta.basename
    prefix   = var.meta.prefix
  }
}