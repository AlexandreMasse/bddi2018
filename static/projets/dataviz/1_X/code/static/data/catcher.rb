require 'json'

countries = JSON.parse(File.read(__dir__+'/earth.json'))



minCO2 = nil
maxCO2 = nil

# Detect max co2 & min co2
countries["features"].each do |c|
  if c["properties"]["co2"]
    c["properties"]["co2"].each do |val|
      val = val[1]
      if val

        if minCO2 == nil || val < minCO2
          minCO2 = val
        end

        if maxCO2 == nil || val > maxCO2
          maxCO2 = val
        end

      end
    end
  end
end

puts "--------- Extremes data ----------"
puts "Valeur minimum : " + minCO2.to_s
puts "Valeur maximum : " + maxCO2.to_s



