class AddImageUrlToPets < ActiveRecord::Migration[6.0]
  def change
    add_column :pets, :image_url, :text
  end
end
