namespace :class_name do
  task init: :environment do
    ClassName.create(name: "QH-2014-I/CQ-CA(K59)")
    ClassName.create(name: "QH-2014-I/CQ-CB(K59)")
    ClassName.create(name: "QH-2014-I/CQ-CC(K59)")
    ClassName.create(name: "QH-2014-I/CQ-CD(K59)")
    ClassName.create(name: "QH-2014-I/CQ-CLC(K59)")
    ClassName.create(name: "QH-2014-I/CQ-T(K59)")
  end
end
