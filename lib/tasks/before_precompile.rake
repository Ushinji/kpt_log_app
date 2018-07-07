task :build_webpack do
  sh "npm install"
  sh "npm run build"
end

Rake::Task["assets:precompile"].enhance(%i(build_webpack))