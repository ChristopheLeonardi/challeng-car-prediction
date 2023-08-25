from djongo import models

class DummyData(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    Prix = models.IntegerField()
    year = models.IntegerField()
    origin = models.CharField(max_length=50)
    firstCirculationDate = models.CharField(max_length=20)
    firstHand = models.CharField(max_length=10)
    mileage = models.CharField(max_length=20)
    energy = models.CharField(max_length=20)
    gearbox = models.CharField(max_length=20)
    externalColor = models.CharField(max_length=20)
    doors = models.IntegerField()
    ratedHorsePower = models.CharField(max_length=20)
    powerDIN = models.CharField(max_length=20)
    critAir = models.CharField(max_length=5)
    co2 = models.CharField(max_length=10)
    owners = models.FloatField(null=True)  # Utilisation de FloatField pour gérer NaN

    class Meta:
        db_table = 'dummy_data'

    def __str__(self):
        return f"{self.year} {self.origin} - {self.Prix}"


class Cars(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    Prix = models.IntegerField()
    year = models.IntegerField()
    origin = models.CharField(max_length=50)
    firstCirculationDate = models.CharField(max_length=20)
    firstHand = models.CharField(max_length=10)
    mileage = models.CharField(max_length=20)
    energy = models.CharField(max_length=20)
    gearbox = models.CharField(max_length=20)
    externalColor = models.CharField(max_length=20)
    doors = models.IntegerField()
    ratedHorsePower = models.CharField(max_length=20)
    powerDIN = models.CharField(max_length=20)
    critAir = models.CharField(max_length=5)
    co2 = models.CharField(max_length=10)
    marqueModele = models.CharField(max_length=50)
    owners = models.CharField(max_length=5)

    class Meta:
        db_table = 'Cars'

    def __str__(self):
        return f"{self.year} {self.origin} - {self.Prix}"

    def to_dict(self):
        return {
            '_id': str(self._id),
            'Prix': self.Prix,
            'year': self.year,
            'origin': self.origin,
            'firstCirculationDate': self.firstCirculationDate,
            'firstHand': self.firstHand,
            'mileage': self.mileage,
            'energy': self.energy,
            'gearbox': self.gearbox,
            'externalColor': self.externalColor,
            'doors': self.doors,
            'ratedHorsePower': self.ratedHorsePower,
            'powerDIN': self.powerDIN,
            'critAir': self.critAir,
            'co2': self.co2,
            'marqueModele': self.marqueModele,
            'owners': self.owners,
        }