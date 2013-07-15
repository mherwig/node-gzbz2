{
    'targets': [
        {
            'target_name': 'gzbz2',
            'type': '<(library)',
            'sources': [ 'src/compress.cc' ],
            'include_dirs': [ './src' ],
            'libraries': [
                '-lbz2',
                '-lz'
            ],
            'defines': [
                'WITH_GZIP',
                'WITH_BZIP'
            ],
            'cflags': [ '-fexceptions' ],
            'cflags_cc': [ '-fexceptions' ]
        }
    ]
}

