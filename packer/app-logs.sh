#!/bin/bash

sudo bash -c "cat << EOF > /etc/google-cloud-ops-agent/config.yaml
logging:
  receivers:
    webapp-receiver:
      type: files
      include_paths:
        - /var/logs/webapp.log
      record_log_file_path: true
  processors:
    webapp-processor:
      type: parse_json
      time_key: time
      time_format: \"%Y-%m-%dT%H:%M:%S.%L%Z\"
  service:
    pipelines:
      default_pipeline:
        receivers: [webapp-receiver]
        processors: [webapp-processor]
EOF"

sudo systemctl restart google-cloud-ops-agent