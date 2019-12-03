class CreatePets < ActiveRecord::Migration[6.0]
  def change
    create_table :pets do |t|
      t.string :name
      t.string :description
      t.string :species
      t.string :breed
      t.date :birth_date

      t.timestamps
    end
  end
end
