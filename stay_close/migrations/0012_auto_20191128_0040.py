# Generated by Django 2.2.7 on 2019-11-28 00:40

from django.db import migrations
import django_encrypted_filefield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('stay_close', '0011_merge_20191127_0049'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=django_encrypted_filefield.fields.EncryptedImageField(blank=True, null=True, upload_to='images'),
        ),
    ]
