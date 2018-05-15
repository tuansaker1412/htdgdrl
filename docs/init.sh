bundle install
rake db:drop
rake db:create
rake db:migrate
rake class_name:init
rake user:init
# rake address:init
