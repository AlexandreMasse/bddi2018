require 'json'

def completeData (min, max, datas)
  results = {}
  missing = []

  # Par défaut le dernier valide est le minimum
  last = nil
  minExist = nil
  maxExist = nil

  for i in min..max

    # Si l'année est spécifier dans les données
    if datas[i.to_s] && datas[i.to_s].to_f != 0.0

      # Si le minimum existant n'a pas été définis, on le définit
      if( !minExist )
        minExist = i
      end

      # Si le maximum définit n'a pas été définis ou qu'il n'est plus le dernier existant le change
      if( !maxExist || maxExist < i )
        maxExist = i
      end

      # Le résultat est valide, on l'ajoute
      results[i] = datas[i.to_s].to_f

      # Le dernier valide devient celui parcouru
      last = i

      # On parcourt les valeurs manquantes
      missing.each do |m|
        # Si leurs valeur next est encore à nil, on la définit à la valeur courante
        if m[:next] == nil
          m[:next] = last
        end
      end

    else
      # Si la valeure n'est pas définis dans les datas, on rajoute le missing
      results[i] = nil
      missing << { year: i, last: last, next: nil }
    end
  end

  #puts missing
  missing.each do |m|
    # Si la valeur de next et de nil sont non nulle
    if m[:next] != nil && m[:last] != nil
      # puts m[:next].to_s + " - "+ m[:last].to_s
      # puts results[m[:next].to_i].to_s + " => " + results[m[:last]].to_s
      coefLocal = (results[m[:next]].to_f - results[m[:last]].to_f) / (m[:next].to_f - m[:last].to_f)
      results[m[:year]] = results[m[:last]].to_f + coefLocal * (m[:year] - m[:last]).to_f
      results[m[:year]] = (results[m[:year]]*1000.0).floor/1000.0
    else
      if minExist != nil && maxExist != nil
        coefGlobal = (results[maxExist].to_f - results[minExist].to_f) / (maxExist.to_f - minExist.to_f)

        if minExist > m[:year]
          results[m[:year]] = results[minExist].to_f + coefGlobal * (m[:year] - maxExist).to_f
        else
          results[m[:year]] = results[maxExist].to_f + coefGlobal * (m[:year] - maxExist).to_f
        end

        results[m[:year]] = (results[m[:year]]*1000.0).floor/1000.0
      end
    end
  end
  return results
end



countries = JSON.parse(File.read(__dir__+'/earth.json'))
co2 = JSON.parse(File.read(__dir__+'/co2.json'))
pop11 = JSON.parse(File.read(__dir__+'/pop11.json'))
temps = JSON.parse(File.read(__dir__+'/temperature.json'))
precipitation = JSON.parse(File.read(__dir__+'/precipitation.json'))
earthTemps = JSON.parse(File.read(__dir__+'/earth-temperature.json'))

countries["features"].each do |c|
  co2.each do |co2I|
    if co2I["cd"] == c["properties"]["gu_a3"]
      c["properties"]["co2"] = []
      c["properties"]["co2"] = completeData(1990, 2100, co2I)
    end
  end
  pop11.each do |pop11I|
    if pop11I["Country"] == c["properties"]["name_sort"]
      c["properties"]["pop_projected"] = []
      c["properties"]["pop_projected"] = completeData(1990, 2100, pop11I)
    end
  end
  temps.each do |temp|
    if temp["cd"] == c["properties"]["gu_a3"]
      c["properties"]["temperatures"] = []
      c["properties"]["temperatures"] = completeData(1990, 2100, temp)
    end
  end
end

fileEarth = File.open(__dir__+"/precipitation.gen.js", "w");
fileEarth.write("export default " + completeData(1990, 2100, precipitation).to_json);

fileEarthTemperature = File.open(__dir__+"/temperature-earth.gen.js", "w");
fileEarthTemperature.write("export default " + completeData(1990, 2100, earthTemps).to_json);

file = File.open(__dir__+"/co2.proj.json", "w")
file.write(countries.to_json)

