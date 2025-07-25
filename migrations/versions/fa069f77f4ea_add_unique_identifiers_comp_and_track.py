"""add unique identifiers comp and track

Revision ID: fa069f77f4ea
Revises: e8773f50a347
Create Date: 2023-06-23 15:48:39.776549

"""
from alembic import op
import sqlalchemy as sa
import shortuuid

# revision identifiers, used by Alembic.
revision = 'fa069f77f4ea'
down_revision = 'e8773f50a347'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('composition', schema=None) as batch_op:
        batch_op.add_column(sa.Column('uuid', sa.String(length=22), nullable=False))        

    connection = op.get_bind()
    result = connection.execute(sa.text("SELECT id FROM composition"))
    rows = result.fetchall()

    for row in rows:
        unique_value = shortuuid.uuid()
        connection.execute(sa.text("UPDATE composition SET uuid = '{}' WHERE id = '{}'".format(unique_value, row[0])))    

    with op.batch_alter_table('track', schema=None) as batch_op:
        batch_op.add_column(sa.Column('uuid', sa.String(length=22), nullable=False))        

    connection = op.get_bind()
    result = connection.execute(sa.text("SELECT id FROM track"))
    rows = result.fetchall()

    for row in rows:
        unique_value = shortuuid.uuid()
        connection.execute(sa.text("UPDATE track SET uuid = '{}' WHERE id = '{}'".format(unique_value, row[0])))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('track', schema=None) as batch_op:        
        batch_op.drop_column('uuid')

    with op.batch_alter_table('composition', schema=None) as batch_op:        
        batch_op.drop_column('uuid')

    # ### end Alembic commands ###
