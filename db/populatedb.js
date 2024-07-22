require('dotenv').config();
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: 5432
  }
});

async function main() {
  console.log("seeding...");

  try {
    // Check if 'composers' table exists and create it if not
    const hasComposersTable = await knex.schema.hasTable('composers');
    if (!hasComposersTable) {
      await knex.schema.createTable('composers', table => {
        table.increments('id').primary();
        table.string('first_name', 255);
        table.string('last_name', 255);
        table.text('bio');
        table.date('birth_date');
        table.date('death_date');
        table.string('era', 255);
      });

      // Inserting data into composers table
      await knex('composers').insert([
        { first_name: 'Ludwig', last_name: 'van Beethoven', bio: 'A German composer and pianist. Beethoven remains one of the most admired composers in the history of Western music.', birth_date: '1770-12-17', death_date: '1827-03-26', era: 'Classical' },
        { first_name: 'Wolfgang Amadeus', last_name: 'Mozart', bio: 'A prolific and influential composer of the Classical period. Born in Salzburg, Mozart showed prodigious ability from his earliest childhood.', birth_date: '1756-01-27', death_date: '1791-12-05', era: 'Classical' },
        { first_name: 'Johann Sebastian', last_name: 'Bach', bio: 'A German composer and musician of the Baroque period. He is known for instrumental compositions such as the Brandenburg Concertos.', birth_date: '1685-03-31', death_date: '1750-07-28', era: 'Baroque' },
        { first_name: 'Frédéric', last_name: 'Chopin', bio: 'A Polish composer and virtuoso pianist of the Romantic era who wrote primarily for solo piano.', birth_date: '1810-03-01', death_date: '1849-10-17', era: 'Romantic' },
        { first_name: 'Claude', last_name: 'Debussy', bio: 'A French composer. He is sometimes seen as the first Impressionist composer, although he vigorously rejected the term.', birth_date: '1862-08-22', death_date: '1918-03-25', era: 'Impressionist' },
        { first_name: 'Franz', last_name: 'Liszt', bio: 'A Hungarian composer, virtuoso pianist, conductor, and teacher of the Romantic era.', birth_date: '1811-10-22', death_date: '1886-07-31', era: 'Romantic' },
        { first_name: 'Sergei', last_name: 'Rachmaninoff', bio: 'A Russian composer, virtuoso pianist, and conductor of the late Romantic period.', birth_date: '1873-04-01', death_date: '1943-03-28', era: 'Romantic' },
        { first_name: 'Alexander', last_name: 'Scriabin', bio: 'A Russian composer and pianist. Scriabin was a composer who developed a highly lyrical and idiosyncratic tonal language.', birth_date: '1872-01-06', death_date: '1915-04-27', era: 'Romantic' },
        { first_name: 'Domenico', last_name: 'Scarlatti', bio: 'An Italian composer who spent much of his life in the service of the Portuguese and Spanish royal families.', birth_date: '1685-10-26', death_date: '1757-07-23', era: 'Baroque' },
        { first_name: 'Maurice', last_name: 'Ravel', bio: 'A French composer, pianist, and conductor known for his innovative compositions.', birth_date: '1875-03-07', death_date: '1937-12-28', era: 'Impressionist' }
      ]);

    }

    // Check if 'pieces' table exists and create it if not
    const hasPiecesTable = await knex.schema.hasTable('pieces');
    if (!hasPiecesTable) {
      await knex.schema.createTable('pieces', table => {
        table.increments('id').primary();
        table.string('title', 255).notNullable();
        table.integer('composer_id').unsigned().notNullable();
        table.date('composition_date');
        table.text('description');
        table.string('era', 255);
        table.foreign('composer_id').references('id').inTable('composers');
      });
      
      await knex('pieces').insert([
        { title: 'Symphony No. 9', composer_id: 1, composition_date: '1824-05-07', description: 'Also known as the "Choral Symphony", it is one of the best-known works in common practice music.', era: 'Classical' },
        { title: 'Für Elise', composer_id: 1, composition_date: '1810-04-27', description: 'A popular name for the Bagatelle No. 25 in A minor.', era: 'Classical' },
        { title: 'Moonlight Sonata', composer_id: 1, composition_date: '1801-02-27', description: 'A piano sonata by Beethoven.', era: 'Classical' },
        { title: 'Requiem', composer_id: 2, composition_date: '1791-12-05', description: 'A Requiem Mass in D minor, left unfinished at the time of his death.', era: 'Classical' },
        { title: 'The Magic Flute', composer_id: 2, composition_date: '1791-09-30', description: 'An opera in two acts by Mozart.', era: 'Classical' },
        { title: 'Eine kleine Nachtmusik', composer_id: 2, composition_date: '1787-08-10', description: 'A serenade by Mozart.', era: 'Classical' },
        { title: 'Brandenburg Concerto No. 3', composer_id: 3, composition_date: '1721-03-24', description: 'One of the six Brandenburg Concertos by Johann Sebastian Bach.', era: 'Baroque' },
        { title: 'Toccata and Fugue in D minor', composer_id: 3, composition_date: '1704-04-21', description: 'A piece of organ music attributed to Bach.', era: 'Baroque' },
        { title: 'The Well-Tempered Clavier', composer_id: 3, composition_date: '1722-01-01', description: 'A collection of two sets of preludes and fugues in all 24 major and minor keys.', era: 'Baroque' },
        { title: 'Nocturne in E-flat major, Op. 9, No. 2', composer_id: 4, composition_date: '1832-06-21', description: 'One of Chopin\'s most famous pieces, known for its beautiful melody.', era: 'Romantic' },
        { title: 'Prelude in D-flat major, Op. 28, No. 15', composer_id: 4, composition_date: '1839-01-01', description: 'Also known as the "Raindrop Prelude".', era: 'Romantic' },
        { title: 'Ballade No. 1 in G minor, Op. 23', composer_id: 4, composition_date: '1831-09-01', description: 'A popular ballade for solo piano by Chopin.', era: 'Romantic' },
        { title: 'Clair de Lune', composer_id: 5, composition_date: '1905-04-30', description: 'A famous piece from Debussy\'s Suite Bergamasque.', era: 'Impressionist' },
        { title: 'La Mer', composer_id: 5, composition_date: '1905-10-15', description: 'An orchestral composition by Debussy.', era: 'Impressionist' },
        { title: 'Prélude à l\'après-midi d\'un faune', composer_id: 5, composition_date: '1894-12-22', description: 'A symphonic poem for orchestra by Debussy.', era: 'Impressionist' },
        { title: 'Hungarian Rhapsody No. 2', composer_id: 6, composition_date: '1847-01-01', description: 'One of Franz Liszt\'s most famous compositions.', era: 'Romantic' },
        { title: 'Liebestraum No. 3', composer_id: 6, composition_date: '1850-01-01', description: 'A set of three solo piano works by Liszt.', era: 'Romantic' },
        { title: 'Totentanz', composer_id: 6, composition_date: '1849-01-01', description: 'A piece for solo piano and orchestra by Liszt.', era: 'Romantic' },
        { title: 'Piano Concerto No. 2', composer_id: 7, composition_date: '1901-01-01', description: 'One of the most famous piano concertos by Rachmaninoff.', era: 'Romantic' },
        { title: 'Prelude in C-sharp minor', composer_id: 7, composition_date: '1892-01-01', description: 'One of Rachmaninoff\'s most famous compositions.', era: 'Romantic' },
        { title: 'Rhapsody on a Theme of Paganini', composer_id: 7, composition_date: '1934-01-01', description: 'A concertante work written for piano and orchestra.', era: 'Romantic' },
        { title: 'Piano Sonata No. 2', composer_id: 8, composition_date: '1913-01-01', description: 'One of Scriabin\'s most famous piano sonatas.', era: 'Romantic' },
        { title: 'Vers la flamme', composer_id: 8, composition_date: '1914-01-01', description: 'A famous piano piece by Scriabin.', era: 'Romantic' },
        { title: 'Symphony No. 3', composer_id: 8, composition_date: '1904-01-01', description: 'Also known as "The Divine Poem".', era: 'Romantic' },
        { title: 'Sonata in D minor, K. 141', composer_id: 9, composition_date: '1749-01-01', description: 'One of Scarlatti\'s most famous keyboard sonatas.', era: 'Baroque' },
        { title: 'Sonata in E major, K. 380', composer_id: 9, composition_date: '1738-01-01', description: 'A popular keyboard sonata by Scarlatti.', era: 'Baroque' },
        { title: 'Sonata in F minor, K. 466', composer_id: 9, composition_date: '1756-01-01', description: 'Another well-known sonata by Scarlatti.', era: 'Baroque' },
        { title: 'Boléro', composer_id: 10, composition_date: '1928-11-22', description: 'One of Ravel\'s most famous orchestral compositions.', era: 'Impressionist' },
        { title: 'Pavane pour une infante défunte', composer_id: 10, composition_date: '1899-04-05', description: 'A pavane for piano written by Ravel.', era: 'Impressionist' },
        { title: 'Daphnis et Chloé', composer_id: 10, composition_date: '1912-06-08', description: 'A ballet by Ravel.', era: 'Impressionist' }
      ]);
    }

    console.log("done");
  } catch (err) {
    console.error("Error executing query", err);
  } finally {
    await knex.destroy();
  }
}

main()