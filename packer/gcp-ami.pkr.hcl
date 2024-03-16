
packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1"
    }
  }
}

variable "project_id" {
  type = string
  description = "The GCP project ID where the image will be created"
}

variable "source_image_family" {
  type = string
  description = "The family name of the source image (e.g., centos-8)"
}

variable "image_family" {
  type = string
  description = "The family name of the image"
}

variable "zone" {
  type = string
  description = "The GCP zone where the image will be created (e.g., us-central1-a)"
}

variable "disk_size" {
  type = number
  description = "The size of the disk in GB for the custom image"
}

variable "disk_type" {
  type = string
  description = "The type of disk for the custom image (e.g., pd-standard, pd-ssd)"
}

source "googlecompute" "custom-image" {
  project_id = var.project_id
  source_image_family = var.source_image_family
  zone = var.zone
  disk_size = var.disk_size
  disk_type = var.disk_type
  image_name = "custom-image-{{timestamp}}"
  image_description = "Custom Image using CentOS as source image"
  image_family = var.image_family
  image_project_id = var.project_id
  image_storage_locations = ["us"]
  ssh_username = "packer"
}

build {
  sources = ["source.googlecompute.custom-image"]

  provisioner "file" {
    source      = "./webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  provisioner "file" {
    source      = "./webapp.service"
    destination = "/tmp/csye6225.service"
  }

  provisioner "shell" {
    script = "./packer/user-creation.sh"
  }

  provisioner "shell" {
    script = "./packer/node.sh"
  }

  provisioner "shell" {
    script = "./packer/copy-webapp.sh"
  }

  provisioner "shell" {
    script = "./packer/user-start.sh"
  }

  provisioner "shell" {
    script = "./packer/cloud-ops.sh"
  }

  provisioner "shell" {
    script = "./packer/app-logs.sh"
  }

}
