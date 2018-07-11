#!/usr/bin/env ruby
 
require 'pathname'
ENV['BUNDLE_GEMFILE'] ||= File.expand_path("../../Gemfile",
  Pathname.new(__FILE__).realpath)
 
require 'rubygems'
require 'bundler/setup'
 
require File.expand_path('../application', __FILE__)
Rails.application.require_environment!
 
load Gem.bin_path('pry', 'pry')