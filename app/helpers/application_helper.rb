module ApplicationHelper
  def assets_path(path)
    return webpack_dev_server_path(path) if Rails.env.development? || Rails.env.test?
    manifest = Rails.application.config.assets_manifest
    path = manifest[path] if manifest && manifest[path].present?
    "/dist/#{path}"
  end

  def css_load_tag(file_name)
    if Rails.env.development? || Rails.env.test?
      javascript_include_tag webpack_dev_server_path("#{file_name}.js")
    else
      stylesheet_link_tag assets_path("#{file_name}.css")
    end
  end

  private
  def webpack_dev_server_path(path)
    "http://localhost:3500/#{path}"
  end
end
