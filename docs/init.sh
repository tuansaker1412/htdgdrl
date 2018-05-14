bundle install
rake db:drop
rake db:create
rake db:migrate
rake user:init
rake address:init
