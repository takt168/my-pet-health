class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :name
      t.string :type
      t.date :event_date
      t.date :expiration_date

      t.timestamps
    end
  end
end
