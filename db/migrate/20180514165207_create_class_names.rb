class CreateClassNames < ActiveRecord::Migration
  def change
    create_table :class_names do |t|

      t.timestamps null: false
      t.string :name
    end
  end
end
