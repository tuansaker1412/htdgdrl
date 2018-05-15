class AddColumnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :birthday, :date
    add_column :users, :mssv, :string
    add_reference :users, :class_name, index: true, foreign_key: true
  end
end
